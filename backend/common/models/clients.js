/**
 * Creation Date: 13/09/2021
 * Author: Caio Cesar Costa
 * <p/>
 * Desafio venda valida
 */

'use strict';
const filterMethods = require('../utils/filterMethods.js');
const commonService = require('../utils/commonService.js');

module.exports = function (clients) {

    // Exposes just a few methods
    filterMethods.exposeMethods(clients, ['register', 'find']);

    /**
   * Create a new client.
   * @param data
   * @param callback
   */

    clients.register = function (data, callback) {
        const erros = Validation(data)

        if (erros.length === 0) {
            // validates if the client is already registered 
            clients.findOne({ "where": { "cpf": data.cpf } }, function (error, instance) {
                if (!error) {
                    if (!instance) {
                        clients.insertNewClient(data, callback); /*insert new instance*/
                    } else {
                        clients.UpdateClient(instance, data, callback); /*update the instance*/
                    }
                } else {
                    cb(commonService.errorMaker(error));
                }
            });
        } else {
            callback(commonService.errorMaker({
                statusCode: 422,
                name: "Unprocessable Entity",
                message: erros
            }));
        }
    };

    /**
    * Insert the data in database
    * @param {data} object - Object containing the client information.
    * @param {cb} callback - Callback to with the response for the end-point.
    */
    clients.insertNewClient = function (data, cb) {
        clients.create(data, function (errorClient, ClientSaved) {
            if (!errorClient) {
                cb(null, { statusCode: '201', message: "Cliente registrado para entrega com sucesso.", ClientSaved });
            } else {
                cb(commonService.errorMaker(errorClient));
            }
        });
    }

    /**
    * Update the data in database with client already exist
    * @param {instance} object - Object containing the client information already in database
    * @param {data} object - Object containing the client information provided for the API
    * @param {callback} callback - Callback to with the response for the end-point.
    */
    clients.UpdateClient = function (instance, data, callback) {
        const promises = [
            instance.updateAttributes({ "email": data.email }),
            instance.updateAttributes({ "name": data.name }),
            instance.updateAttributes({ "surname": data.surname }),
            instance.updateAttributes({ "phone": data.phone }),
            instance.updateAttributes({ "person_type": data.person_type }),
            instance.updateAttributes({ "allow_promotions": data.allow_promotions })
        ];

        return Promise.all(promises)
            .then(resp => {
                callback(null, { statusCode: 200, message: "Cliente registrado para entrega com sucesso.", resp });
            })
            .catch(callErr => {
                callback(commonService.errorMaker(callErr));
            })
    }

    /**
   * Function responsible for validation the object received
   * @param {data} object - Object containing the client information provided for the API
   */
    function Validation(data) {
        let erros = []
        let str_email = /\S+@\S+\.\S+/
        let str_phone = /(\(?\d{2}\)?\s)?(\d{4,5}\-?\d{4})/
        let str_cpf = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/
        let str_cnpj = /^(([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}))$/
        let cpf = data.cpf?.replace(/[\(\)\.\s-/]+/g, '')

        if (data.email === undefined || data.name === undefined || data.surname === undefined || data.cpf === undefined ||
            data.phone === undefined || data.person_type === undefined || data.allow_promotions === undefined) {
            erros.push({ "Objeto inválido": ["Propriedade obrigatórias: email|name|surname|cpf|phone|person_type|allow_promotions"] })
            return erros;
        }

        if (!str_email.test(data.email) || data.email.trim() === '' || data.email.length > 100) {
            erros.push({ "email": ["Propriedade 'email' não informada ou inválida.", "Ex: caiu.cost@gmail.com", "Type: string (100)"] })
        }

        if (data.name === '' || data.name.length > 30) {
            erros.push({ "name": ["Propriedade 'name' não informada ou inválida.", "Ex: Caio Cesar", "Type: string (30)"] })
        }

        if (data.surname === '' || data.surname.length > 30) {
            erros.push({ "surname": ["Propriedade 'surname' não informada ou inválida.", "Ex: Costa", "Type: string (30)"] })
        }

        if ((!str_cpf.test(cpf) && !str_cnpj.test(cpf)) || cpf.trim() === '') {
            erros.push({ "cpf": ["Propriedade 'cpf' não informada ou inválida.", "Ex: 111.111.111-11 (CPF) ou 11.111.111/1111-11 (CNPJ)"] })
        }

        if (!str_phone.test(data.phone) || data.phone.trim() === '') {
            erros.push({ "phone": ["Propriedade 'phone' não informada ou inválida.", "Ex: (11) 94704-5537"] })
        }

        if ((cpf === 11 && data.person_type.toUpperCase() !== 'F') || (cpf === 14 && data.person_type.toUpperCase() !== 'J') || data.person_type.trim() === '') {
            erros.push({ "person_type": ["Propriedade 'person_type' não informada ou inválida.", " 'F' (CPF) ou 'J' (CNPJ)"] })
        }

        if (data.allow_promotions.toUpperCase() !== 'S' && data.allow_promotions.toUpperCase() !== 'N') {
            erros.push({ "allow_promotions": ["Propriedade 'allow_promotions' não informada ou inválida.", " 'S' (Sim) ou 'N' (Não)"] })
        }

        return erros;
    }

    clients.remoteMethod(
        'register', {
        http: { path: '/register', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'body', type: 'object', root: true },
        description: "Create a new client"
    }
    );
};
