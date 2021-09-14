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
        if (JSON.stringify(data) !== '{}') {
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
                statusCode: 400,
                name: "BAD REQUEST",
                message: "Falha ao criar cliente."
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
                cb(null, { statusCode: '200', message: "Cliente registrado para entrega com sucesso." });
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

    clients.remoteMethod(
        'register', {
        http: { path: '/register', verb: 'post' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'body', type: 'object', root: true },
        description: "Create a new client"
    }
    );
};
