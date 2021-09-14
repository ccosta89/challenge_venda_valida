import React, { useState } from 'react';
import { Input as Input } from 'reactstrap';
import Button from '@material-ui/core/Button'
import useForm from 'react-hook-form';
import InputMask from 'react-input-mask';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import $ from 'jquery';

import { Panel, Footer, Div, Header, Div1 } from './styles'

const styles = {
    width: '100%',
    height: '60px',
    padding: '3px 5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(51, 51, 51, 0.65)',
    borderRadius: '4px',
    color: 'rgba(51, 51, 51, 0.7)',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    lineHeight: '20px'
}

export default function Registration() {

    const { register, handleSubmit, errors } = useForm();
    const [checked, setChecked] = useState(false);
    const [email_valido, setEmail_valido] = useState(true);
    const [person_type, setPerson_type] = useState({ checkedA: false });
    const [name_label, setName_label] = useState('Primeiro nome');
    const [surname_label, setSurname_label] = useState('Sobrenome');
    const [id_label, setId_label] = useState('CPF');
    const [idMask, setIdMask] = useState('999.999.999-99')
    const [suggestedEmail, setSuggestedEmail] = useState('')

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handlePersonType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPerson_type({ ...person_type, [event.target.name]: event.target.checked });

        if (event.target.checked) {
            setName_label('Razão Social')
            setSurname_label('Nome fantasia')
            setIdMask('99.999.999/9999-99')
            setId_label('CNPJ')
        } else {
            setName_label('Primeiro nome')
            setSurname_label('Sobrenome')
            setIdMask('999.999.999-99')
            setId_label('CPF')
        }
    };

    const validEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        let re = /\S+@\S+\.\S+/
        let email = event.target.value

        if (!re.test(email) && email !== '') {
            setEmail_valido(false)
        }

        if (re.test(email) && email !== '') {
            setEmail_valido(true)

            if (email.substring(email.trim().length - 3).indexOf(".br") !== -1) {
                setSuggestedEmail(email.substring(0, email.trim().length - 3))
            }

            if (email.substring(email.trim().length - 4).indexOf(".com") !== -1) {
                setSuggestedEmail(email.trim().concat('.br'))
            }
       }
    }

    const onSubmit = async (data: any) => {
        alert('123')
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Panel>
                    <Header>
                        Dados pessoais
                    </Header>

                    <form>
                        <Div>
                            <Input
                                style={styles}
                                type="email"
                                maskChar="fake@email.com.br"
                                placeholder="E-MAIL"
                                name="email"
                                inputRef={register({ required: true, minLength: 7, maxLength: 100 })}
                                tag={InputMask}
                                onBlur={validEmail}
                                valid = {true}
                            />

                            <small>
                                {(errors.email && email_valido) && (
                                    <span style={{ color: 'red', display: 'flex', margin: 'auto' }}>
                                        O campo E-mail é obrigatório
                                    </span>
                                )}
                            </small>

                            <small>
                                {!email_valido && (
                                    <span style={{ color: 'red', display: 'flex', margin: 'auto' }}>
                                        O conteúdo do campo e-mail está inválido.
                                    </span>
                                )}
                            </small>
                        </Div>

                        {suggestedEmail &&
                            <Div1 onClick={() => $(`email`).find("input").val()}>
                                <span style={{ color: 'black', fontSize: '18px' , display: 'inline'}}>
                                    {'Você quise dizer: '}
                                </span>
                                <span style={{ color: 'blue', fontSize: '16px' , display: 'inline'}}>
                                    {suggestedEmail.substring(0, suggestedEmail.indexOf("@") + 1)}
                                </span>
                                <span style={{ color: 'blue', fontSize: '16px', fontWeight: 700, display: 'inline' }}>
                                    {suggestedEmail.substring(suggestedEmail.indexOf("@") + 1)}
                                </span>
                            </Div1>
                        }

                        <Div>
                            <Input
                                style={styles}
                                type="text"
                                maskChar=""
                                placeholder={name_label}
                                name="nome"
                                inputRef={register({ required: true, minLength: 1, maxLength: 100 })}
                                tag={InputMask}
                            />

                            <small>
                                {errors.nome && (
                                    <span style={{ color: 'red', display: 'flex', margin: 'auto' }}>
                                        O campo {name_label} é obrigatório
                                    </span>
                                )}
                            </small>
                        </Div>

                        <Div>
                            <Input
                                style={styles}
                                type="text"
                                maskChar=""
                                placeholder={surname_label}
                                name="sobrenome"
                                inputRef={register({ required: true, minLength: 1, maxLength: 100 })}
                                tag={InputMask}
                            />

                            <small>
                                {errors.sobrenome && (
                                    <span style={{ color: 'red', display: 'flex', margin: 'auto' }}>
                                        O campo {surname_label} é obrigatório
                                    </span>
                                )}
                            </small>
                        </Div>

                        <Div>
                            <Input
                                style={styles}
                                type="tel"
                                mask={idMask}
                                maskChar=""
                                placeholder={id_label}
                                name="cpf"
                                inputRef={register({ required: true, minLength: 14, maxLength: 18 })}
                                tag={InputMask}
                            />

                            <small>
                                {errors.cpf && (
                                    <span style={{ color: 'red', display: 'flex', margin: 'auto' }}>
                                        O campo {id_label} é obrigatório
                                    </span>
                                )}
                            </small>
                        </Div>

                        <Div>
                            <Input
                                style={styles}
                                type="tel"
                                mask="(99) 999999999"
                                maskChar=""
                                placeholder="Telefone"
                                name="phone"

                                inputRef={register({ required: true, minLength: 13, maxLength: 16 })}
                                tag={InputMask}
                            />

                            <small>
                                {errors.phone && errors.phone.type === 'required' && (
                                    <span style={{ color: 'red', display: 'flex' }}>
                                        O campo telefone é obrigatório
                                    </span>
                                )}
                                {errors.phone && errors.phone.type === 'minLength' && (
                                    <span style={{ color: 'red', display: 'flex' }}>
                                        O tamanho do campo telefone está incorreto
                                    </span>
                                )}
                            </small>
                        </Div>

                        <Div>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={person_type.checkedA}
                                        onChange={handlePersonType}
                                        name="checkedA"
                                        color="primary"
                                    />
                                }
                                label="Incluir dados de pessoa jurídica"
                            />
                        </Div>

                        <Div>
                            <FormControlLabel
                                control={
                                    <Checkbox name="checkedC" color="primary" checked={checked} onChange={handleCheck} />
                                } label="Quero receber e-mails com promoções." />
                        </Div>

                        <Footer>
                            <Button type="submit" style={{ background: '#f29ac0', textTransform: 'none', fontSize: '18px', color: 'black', width: '100%' }} variant="contained" color='primary' onClick={handleSubmit(onSubmit)} >
                                Ir para a Entrega
                            </Button>
                        </Footer>
                    </form>
                </Panel>
            </Container>
        </React.Fragment>
    )
}