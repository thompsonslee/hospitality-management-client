import UserFormElement from "./FormElement"
import { useState } from "react"
import UserFormErrorBox from "./UserFormErrorBox"
import { useNavigate } from "react-router-dom"
interface props {
    formType: "login" | "register"

}
type formData = {
    username: string,
    password: string,
    pwConfirm?: string
}


export default function UserForm({formType}:props){

    const navigate = useNavigate()

    const initalFormData:formData = {
        username: "",
        password: ""
    }
    if(formType === "register") initalFormData["pwConfirm"] = ""

    const [formData, setFormData] = useState(initalFormData)
    const [errors, setErrors] = useState("")

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
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
                credentials: "include",
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify(formData)
            }).then(
                (res) => {
                    if(res.status === 200){
                        navigate("/")
                    }
                    else(setErrors("username or password incorrect"))
                }
            ).catch((e) => console.log(e))
            return
            
        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target
        setFormData({...formData,[name]: value})
    }
    return(
        <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc800 flex flex-col justify-center items-stretch p-10 rounded" onSubmit={(e) => handleSubmit(e)}>
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
                    name = "confirm password"
                    data = {formData.pwConfirm}
                    type = "password"
                    onChange={handleChange}
                />
            )}
            <button className="bg-green600 rounded p-2 mt-5 text-white" type="submit">Submit</button>
        </form>
    )
}