import API from './api.js'
import { confirmPassword, forgotPassword, signIn, self } from './auth.service.js'
import user from './user.service.js'
import app from './app.service.js'

export default {
    instance : API.instance,
    auth : {
        confirmPassword,
        forgotPassword,
        signIn,
        self
    },
    user,
    app
}