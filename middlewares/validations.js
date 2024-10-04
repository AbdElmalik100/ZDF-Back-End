import { checkSchema } from 'express-validator'

const eventsValidationSchema = () => {
    return checkSchema({
        title: {
            notEmpty: {
                errorMessage: "This field is required"
            },
            isLength: {
                options: { max: 255 },
                errorMessage: "Must be less than 255 character"
            }
        },
        description: {
            notEmpty: {
                errorMessage: "This field is required"
            },
        },
        venue: {
            notEmpty: {
                errorMessage: "This field is required"
            }
        },
        date: {
            notEmpty: {
                errorMessage: "This field is required"
            }
        },
        time_from: {
            notEmpty: {
                errorMessage: "This field is required"
            }
        },
        time_to: {
            notEmpty: {
                errorMessage: "This field is required"
            }
        },
        ticket_price: {
            notEmpty: {
                errorMessage: "This field is required"
            }
        },
    })
}


export {
    eventsValidationSchema
}