import * as yup from 'yup'

export const parkOfficerValidationShcema = yup.object().shape({
    fullName: yup.string().trim().required().min(2, 'Full name must be at least 2 characters'),
    badgeNumber: yup.string().trim().required().min(6, 'Badge number must be at least 6 characters').max(6, 'Badge number must be at less 6 characters'),
    district: yup.string().min(5, 'District must be at least 5 characters').required()
})