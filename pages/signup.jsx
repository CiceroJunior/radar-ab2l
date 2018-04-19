/* global fetch */

import React from 'react';
import urlJoin from 'url-join';
import MaskedInput from 'react-text-mask';

import Header from '../components/header';
import Footer from '../components/footer';
import config from '../config';
import Notification from '../components/notification';
import pageStyle from '../style/page';

const { address } = config;
const { api } = address;

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, content: null, response: null, tosPulse: false,
    };
  }

  createCompany(e) {
    e.preventDefault();
    if (!this.agree.checked) {
      this.setState({
        loading: false, content: null, response: null, tosPulse: true,
      });
      return;
    }

    if (this.state.loading) return;
    this.setState({
      loading: true, content: null, response: null, tosPulse: false,
    });

    fetch(urlJoin(api, '/company/create'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cpf: this.cpf.value,
        cnpj: this.cnpj.value,
        email: this.email.value,
        password: this.password.value,
        confirmPassword: this.confirmPassword.value,
        birthday: this.birthday.value,
      }),
    }).then(content => Promise.all([content, content.json()]))
      .then(([content, response]) => this.setState({
        content, response, loading: false, tosPulse: false,
      }));
  }

  render() {
    return (<div>
      <Header />
      <div className="container page" style={pageStyle}>
        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-grey">Cadastro</h3>
                <p className="subtitle has-text-grey">Preencha sua informações para cadastrar-se.</p>
                { this.state.response && this.state.response.status !== 200 && <Notification
                  type="danger"
                  message={this.state.response.toString()}
                /> }
                <div className="box">
                  <form onSubmit={e => this.createCompany(e)}>
                    <div className="field">
                      <div className="control">
                        <MaskedInput
                          mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                          className="input is-large"
                          type="text"
                          ref={(f) => { this.cpf = f; }}
                          placeholder="CPF do Resp. Legal"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <MaskedInput
                          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                          className="input is-large"
                          type="text"
                          ref={(f) => { this.birthday = f; }}
                          placeholder="Data de Nascimento"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-large"
                          ref={(f) => { this.email = f; }}
                          name="email"
                          placeholder="Endereço de Email"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <MaskedInput
                          mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                          className="input is-large"
                          type="text"
                          ref={(f) => { this.cnpj = f; }}
                          placeholder="CNPJ da Empresa"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input className="input is-large" type="password" ref={(f) => { this.password = f; }} placeholder="Senha de Acesso" />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input className="input is-large" type="password" ref={(f) => { this.confirmPassword = f; }} placeholder="Confirmar Senha" />
                      </div>
                    </div>

                    <div className="field">
                      <label
                        className={`checkbox ${this.state.tosPulse ? 'animated fadeIn' : ''}`}
                        htmlFor="agree"
                      > <input
                        type="checkbox"
                        ref={(f) => { this.agree = f; }}
                        name="agree"
                        id="agree"
                      /> Estou ciente dos termos de serviço.</label>
                    </div>
                    <input
                      type="submit"
                      className="button is-block is-info is-large is-fullwidth"
                      value="Entrar"
                    />
                  </form>
                </div>
                <p className="has-text-grey">
                  <a href="/">Precisa de Ajuda?</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
    );
  }
}
