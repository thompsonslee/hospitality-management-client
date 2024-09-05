import UserFormElement from "./UserFormElement"
import { useState } from "react"
import UserFormErrorBox from "./UserFormErrorBox"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
interface props {
    formType: "login" | "register"

}
type formData = {
    username: string,
    password: string,
    pwConfirm?: string
    isDemoAccount?: boolean
}

const url: string = import.meta.env.VITE_API_URL


export default function UserForm({formType}:props){
    const navigate = useNavigate()

    const initalFormData:formData = {
        username: "",
        password: ""
    }
    if(formType === "register"){
        initalFormData["pwConfirm"] = ""
        initalFormData["isDemoAccount"] = true
    }

    const [formData, setFormData] = useState(initalFormData)
    const [errors, setErrors] = useState("")

    console.log(formData)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if(formType === "register"){
            if(formData.password != formData.pwConfirm){
                setErrors("password does not match")
                return
            }
            fetch(`${url}/register`,{
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(formData)
            }).then(
                (res) => {
                    if(res.status === 200){
                        navigate("/")
                    }
                }
            ).catch((e) => console.log(e))
            return
        }
        if(formType === "login"){
            fetch(`${url}/login`,{
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
        console.log(event.target.type)
        if(event.target.type === "checkbox"){
            console.log("type is checkbox")
           const {name,checked} = event.target
           setFormData({...formData,[name]: checked})
           return
        }
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
            {formType === "login" && <div
                className="text-white text-sm w-full ">
                Don't have an account? 
                <Link 
                    className="text-green600 font-bold ml-1"
                    to="/register">
                    Register
                </Link>
            </div>}
            {((formType === "register") && (formData.pwConfirm || formData.pwConfirm === "")) && (
                <>
                    <UserFormElement
                        label="Confirm Password"
                        name = "pwConfirm"
                        data = {formData.pwConfirm}
                        type = "password"
                        onChange={handleChange}
                    />
                    <div className="flex">
                        <label htmlFor="isDemoAccount">Demo Account</label>
                        <input 
                            className="ml-2"
                            name="isDemoAccount" 
                            type="checkbox"
                            onChange={handleChange}
                            defaultChecked={true}
                        />
                    </div>
                </>
            )}
            <button className="bg-green600 rounded p-2 mt-5 text-white" type="submit">Submit</button>
        </form>
    )
}