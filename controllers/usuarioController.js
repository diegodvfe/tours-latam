

const formularioLogin = (req, res) => {
   res.render ( 'auth/login', {
    ateticado: false
   })
}

const formularioSignUp = (req, res) => {
   res.render("auth/signup", {
      pagina: 'Create acount'
   });
};

export {
    formularioLogin,
    formularioSignUp
}
