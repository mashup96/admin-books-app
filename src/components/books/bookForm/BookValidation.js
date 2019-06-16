import Yup from 'yup';

const BookValidation = Yup.object().shape({
    title: Yup.string().required('Required field'),
    price: Yup.string().matches(/^\d+(?:\.{0,1}\d{0,2})$/,
        {
            message: "Enter a valid amount",
            excludeEmptyString: true
        })
        .required('Required field'),
    pageCount: Yup.string().matches(/^[0-9]\d*$/,
        {
            message: "Enter a valid page count",
            excludeEmptyString: true
        })
        .required('Required field'),
    isbn: Yup.string()
        .matches(/^[0-9]{10,13}$/,
            {
                message: "Enter a valid ISBN code",
                excludeEmptyString: true
            })
        .required('Required field'),
    icon: Yup.mixed()
        .test('fileType', "Unsupported File Format",
            function (value) {
                value = (!value) ? {} : value;
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
        .test('fileSize', "File Size is too large",
            function (value) {
                value = (!value) ? {} : value;
                const maxSize = 5 * 1024 * 1024;
                if (value.size === undefined ||
                    value.size <= maxSize) {
                    return true;
                } else {
                    return false;
                }
            })

});

export default BookValidation;