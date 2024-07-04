import UserForm from "../components/UserForm"


type props = {
    type: "login" | "register"
}

export default function LoginPage({type}:props){


    return(
        (type === "login") ? (
            <UserForm 
                formType="login"
            />
        ) : (
            <UserForm
                formType="register"
            />
        )
    )
}