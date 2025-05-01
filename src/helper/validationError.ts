import { MiddlewareFn } from "type-graphql"
import { Context } from "../Users/types/user.types"
import { languageError, throwGraphqlError } from "."
import { ValidationError } from "class-validator"
import { GraphQLError } from "graphql"

export const errorValidationHandler: MiddlewareFn<Context> = async ({info}, next)=> {
    
    try {
        const {fieldName} = info
        await next()
        console.log("after1")
    } catch (err) {
        console.log("errorValidationHandler:")
        console.log("err:",err)
        if(Object.keys(err).includes('validationErrors')) {
            console.log('validationErrors')
            Validation.setError = err
            var a = Validation.translateValidationErrors()
            console.log(Object.keys(err))
            return throwGraphqlError('error validation',400, languageError(a.en, a.ar))
        }
        return throwGraphqlError('error from our server',500, languageError('error from our server',"خطأ من السيرفر الخاص بنا"))
    }
}

class Validation {
    private static err: ValidationError[]
    private static property:string
    private static constraint:string
    // property = this.err[0].property
    // constraint = Object.keys(err[0].constraints)[0]
    static translateValidationErrors():Record<string, any> {
        var path = {
            username: {en: "username", ar: "اسم المستخدم"},
            password: {en: "password", ar: "كلمة السر"},
            phone: {en: "phone", ar: "رقم الهاتف"},
            email: {en: "email", ar: "البريد الالكتروني"},
        }
        var property = this.property
        var constraint = this.constraint
        console.log("property", this.property)
        console.log("constraint", this.constraint)
        if(constraint == 'isLength') {
            return {
                en: `length of ${path[property].en} must be valid`,
                ar: `طول ${path[property].ar} يجب ان يكون صحيح`,
            }
        }
        if(constraint == 'isEmail') {
            return {
                en: `${path[property].en} is not valid email`,
                ar: `${path[property].ar} ليس عنوان بريد صحيح`,
            }
        }
        if(constraint == 'isPhoneNumber') {
            return {
                en: `${path[property].en} is not valid phone number`,
                ar: `${path[property].ar} ليس رقم صالح`,
            }
        }
        // console.log("constraint", this.constraint)
        return {
            en: "incorrect input",
            ar: "خطأ بالمدخلات"
        }
    }

    static set setError(_err: any) {
        this.err = _err.validationErrors
        this.property = this.err[0].property
        this.constraint = Object.keys(this.err[0].constraints)[0]

    }
}