import { useEffect, useState } from "react";
import {
    editUserRoleVerification,
    getUserRoleVerificationDetails
} from "./apis";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "../../../../components/MuComponents/FormikComponents/FormikComponents";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../../../components/MuComponents/FormikComponents/form.module.css";

type Props = {};

const UserRoleVerificationEdit = (props: Props) => {
    const [input1, setInput1] = useState(true);

    interface IData {
        verified: boolean;
    }
    const [data, setData] = useState<IData>({
        verified: false
    });
    useEffect(() => {
        getUserRoleVerificationDetails(id, setData);
    }, []);

    const inputFields = [
        {
            content: "User Role",
            inputType: "text",
            input: input1,
            setInput: setInput1
        }
    ];

    const { id } = useParams();
    const navigate = useNavigate();
    const handleSubmit = () => {
        editUserRoleVerification(input1, id, toast);
        navigate("/user-role-verification");
    };
    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>Edit User Verification</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        // igName: name
                        verified: data.verified
                    }}
                    validationSchema={Yup.object({
                        // igName: Yup.string()
                        //     .max(30, "Must be 30 characters or less")
                        //     .required("Required"),
                        verified: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        editUserRoleVerification(values.verified, id, toast);

                        navigate("/user-role-verification");
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="Verified"
                            name="verified"
                            type="boolean"
                            placeholder="Change Verified"
                        />

                        <div className={styles.btn_container}>
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/user-role-verification");
                                }}
                            />
                            <button type="submit" className={styles.btn_submit}>
                                Confirm
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default UserRoleVerificationEdit;
