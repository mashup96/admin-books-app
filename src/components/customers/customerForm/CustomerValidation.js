import Yup from 'yup';

const CustomerValidation = Yup.object().shape({
    name: Yup.string().required('Required field'),
    email: Yup.string()
        .email('Enter a valid email')
        .required('Required field'),
    city: Yup.string().required('Required field'),
    zipcode: Yup.string().matches(/^\d{5}(?:[-\s]\d{4})?/,
        {
            message: "Enter a valid ZIP code",
            excludeEmptyString: true
        })
        .required('Required field'),
    country: Yup.string().required('Required field'),
    numberOrderedBooks: Yup.string().matches(/^[0-9]\d*$/,
        {
            message: "Enter a valid number ordered books",
            excludeEmptyString: true
        })
        .required('Required field'),
    icon: Yup.mixed()
        .test('fileSize', "File Size is too large",
            function (value) {
                const maxSize = 5 * 1024 * 1024;
                if (value.size === undefined ||
                    value.size <= maxSize) {
                    return true;
                } else {
                    return false;
                }
            })
        .test('fileType', "Unsupported File Format",
            function (value) {
                const arrayTypes = ["image/jpg",
                                    "image/jpeg",
                                    "image/png"];
                if (value.type === undefined ||
                    arrayTypes.includes(value.type)) {
                    return true;
                } else {
                    return false;
                }
            })
});

export default CustomerValidation;