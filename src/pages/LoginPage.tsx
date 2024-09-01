import UserForm from "../components/UserForm"


type props = {
    type: "login" | "register"
}

export default function LoginPage({type}:props){


    return(
        (type === "login") ? (
            <UserForm 
                key="login"
                formType="login"
            />
        ) : (
            <UserForm
                key="register"
                formType="register"
            />
        )
    )
}