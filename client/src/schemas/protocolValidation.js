import * as yup from 'yup'

export const protocolValidationSchema = yup.object().shape({
    serviceNotes: yup.string().trim().required().min(2, 'Full name must be at least 2 characters'),
    fineAmount: yup.number().required(),
    violatorFullName: yup.string().min(5, 'District must be at least 5 characters').required().trim(),
    violatorPassportNumber: yup.string().min(5, 'District must be at least 5 characters').required().trim()
})