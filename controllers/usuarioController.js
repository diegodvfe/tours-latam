

const formularioLogin = (req, res) => {
   res.render ( 'auth/login', {
    pagina: 'Login'
   })
}

const formularioSignUp = (req, res) => {
   res.render("auth/register", {
      pagina: 'Create acount'
   });
};

const register = (req, res) => {
   console.log(req.body)
   
}

const formularioRecoverPas =(req, res) => {
   res.render('auth/recoverpas', {
      pagina: 'Recover password'
   })
}

export {
    formularioLogin,
    formularioSignUp,
    formularioRecoverPas,
    register
}
