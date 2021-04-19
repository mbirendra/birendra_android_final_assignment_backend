const User = require('../models/user_register_model');
const mongoose = require("mongoose");
 
const url = 'mongodb://127.0.0.1:27017/finalnodedatabase_api';
 
beforeAll(async () =>{
    await mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    })
})
 
afterAll(async () => {
    await mongoose.connection.close();
})
 

     describe('Reg',async () =>{
it('User reg',()=>{
    const reg = {
        'fname':'pasish',
        'lname':'pandey',
        'address': 'kjbsdv',
        'phone_number': '823768',
        'username': 'ppas',
        'password': 'ppas',
        'email':'kjsdbvjk@gmail.com',
        'userType': 'Admin'
    }
    return User.create(reg).then((res)=>{
        expect(res.username).toEqual('ppas')
    })
})
     
 
    
    it('Update', () => {
        const reg ={
                    'username': 'Tinker'
                } ;
        return User.findOneAndUpdate({_id:Object('606c3c9d307b063e986d6ffb')},
        {$set : reg})  
    });
 

    it('LOGIN', () => {
            return User.findOne({_id:Object('606c3c9d307b063e986d6ffb')})
            expect(status.ok).toBe(1);
        });
 
    
    it('user del', async() => {
        return User.deleteOne({_id:Object('606c3c9d307b063e986d6ffb')})
            expect(status.ok).toBe(1);
    })
})