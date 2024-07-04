import UserFormElement from "./UserFormElement"
import { useState } from "react"
import UserFormErrorBox from "./UserFormErrorBox"
interface props {
    formType: "login" | "register"

}
type formData = {
    username: string,
    password: string,
    pwConfirm?: string
}


export default function UserForm({formType}:props){

    const initalFormData:formData = {
        username: "",
        password: ""
    }
    if(formType === "register") initalFormData["pwConfirm"] = ""

    const [formData, setFormData] = useState(initalFormData)
    const [errors, setErrors] = useState("")

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log(formData)
        if(formType === "register"){
            if(formData.password != formData.pwConfirm){
                setErrors("password does not match")
                return
            }
            fetch("http://localhost:3000/register",{
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(formData)
            }).then(
                (res) => console.log(res)
            ).catch((e) => console.log(e))
            return
        }
        if(formType === "login"){
            fetch("http://localhost:3000/login",{
                method: "post",
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify(formData)
            }).then(
                (res) => console.log(res)
            ).catch((e) => console.log(e))
            return
            
        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target
        setFormData({...formData,[name]: value})
    }
    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            {(errors) && (
                <UserFormErrorBox error={errors}/>
            )}
            <UserFormElement
                name = "username"
                data = {formData.username}
                type = "text"
                onChange={handleChange}
            />
            <UserFormElement
                name = "password"
                data = {formData.password}
                type = "password"
                onChange={handleChange}
            />
            {((formType === "register") && (formData.pwConfirm || formData.pwConfirm === "")) && (
                <UserFormElement
                    name = "pwConfirm"
                    data = {formData.pwConfirm}
                    type = "password"
                    onChange={handleChange}
                 />
            )}
            <button type="submit">Submit</button>
        </form>
    )
}