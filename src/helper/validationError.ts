import { MiddlewareFn } from "type-graphql"
import { Context } from "../Users/types/user.types"
import { languageError, throwGraphqlError, throwValidationError } from "."
import { ValidationError } from "class-validator"
import { GraphQLError } from "graphql"

export const errorValidationHandler: MiddlewareFn<Context> = async ({info}, next)=> {
    
    try {
        console.log('errorValidationHandler middleware')
        const {fieldName,path} = info
        await next()
        console.log("after1 errorValidationHandler middleware", fieldName, path)
    } catch (err) {
        console.log("errorValidationHandler: ts", err)

        console.log("err:",err.extensions.validationErrors)
        if(Object.keys(err.extensions).includes('validationErrors')) {
            console.log('===validationErrors')
            Validation.setError = err.extensions
            var {en, ar} = Validation.translateValidationErrors()
            console.log(en, ar)
            console.log("property",Validation.property)
            console.log(Object.keys(err))
            return throwValidationError('error validation',400, Validation.property, languageError(en, ar))
        }
        return throwGraphqlError('error from our server',500, languageError('error from our server',"خطأ من السيرفر الخاص بنا"))
    }
}

class Validation {
    private static err: ValidationError[]
    static property:string
    private static constraint:string
    // property = this.err[0].property
    // constraint = Object.keys(err[0].constraints)[0]
    static translateValidationErrors():{en:string, ar:string} {
        var path = {
            username: {en: "username", ar: "اسم المستخدم"},
            password: {en: "password", ar: "كلمة السر"},
            phone: {en: "phone", ar: "رقم الهاتف"},
            email: {en: "email", ar: "البريد الالكتروني"},
            projectName: {en: "project name", ar: "اسم المشروع"},
            description: {en: "description", ar: "الوصف"},
            progress: {en: "progress", ar: "التقدم"},
            imageUrl: {en: "imageUrl", ar: "عنوان الصورة"},
            projectManager: {en: "project manager", ar: "اسم مدير المشروع"},
            role: {en: "role", ar: "الدور"},
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
        if(constraint == "max") {
            return {
                // get the max number from the constraint

                en: `${path[property].en} is greater than ${this.err[0].constraints.max}`,
                ar: `${path[property].ar} اكبر من ${this.err[0].constraints.max}`,
            }
        }
        if(constraint == "min") {
            return {
                // get the min number from the constraint
                en: `${path[property].en} is less than ${this.err[0].constraints.min}`,
                ar: `${path[property].ar} اقل من ${this.err[0].constraints.min}`,
            }
        }
        if(constraint == "isEnum") {
            return {
                // get the min number from the constraint
                en: `${path[property].en} is not valid value`,
                ar: `${path[property].ar} ليس قيمة صحيحة`,
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
        console.log("__err", this.err)
        this.property = this.err[0].property
        this.constraint = Object.keys(this.err[0].constraints)[0]

    }

}