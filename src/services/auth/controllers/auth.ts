import { IAuth } from './../types.d';
import jwt from 'jsonwebtoken'
import Users from '../../../db/users.json'



export const AuthController = {
    login: async (req, res): Promise<IAuth> => {
        try {
            if(!req.body) {
                return res.status(400).json({
                    token: null,
                    error: 'Field can\'t be empty!'
                })
            }
            console.log(req.body)
            const { login, password } = req.body

            if (login !== Users.login || password !== Users.password) 
                return res.status(422).json({
                    token: null,
                    error: 'Login or password error'
                })
            
            const token = jwt.sign({user: Users.login}, 'SomeSecretkay')
            
            const sess = req.session
            sess.token = token
            sess.save()

            return res.status(200).json({
                token,
                error: null
            })
            
        } catch (error) {           
             return res.status(500).json({token: null, error: 'Server error'})
        }
    },
    logout: (req, res): IAuth => {
        try {
            
            return res.status(200).json({
                token: null,
                error: null
            })
            
        } catch (error) {           
             return res.status(500).json({token: null, error: 'Server error'})
        }
    },
}