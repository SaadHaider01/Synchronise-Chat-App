import React, { useState } from 'react';
import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Input } from "@/components/ui/input";
import { TabsTrigger } from "@/components/ui/tabs";
import { Tabs, TabsContent, TabsList } from "@radix-ui/react-tabs";
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTES, SIGNUP_ROUTES } from '../../utils/constants';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';

const Auth = () => {
    const navigate  = useNavigate();
    const {setUserInfo} = useAppStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateLogin = () =>{
        if(!email.length) {
            toast.error("Email is required.");
            return false;
        }
        if(!password.length){
            toast.error("Password is required");
            return false;
        }
        return true;
    };

    const validateSignup = () => {
        if(!email.length) {
            toast.error("Email is required.");
            return false;
        }
        if(!password.length){
            toast.error("Password is required");
            return false;
        }
        if(password !== confirmPassword){
           toast.error("Password and confirm password should be same"); 
           return false;
        }
        return true;
    };

    const handleLogin = async ()=>{
        if(validateLogin()) {
            const response = await apiClient.post(LOGIN_ROUTES, {email,password},{withCredentials:true});
            if(response.data.user.id){
                setUserInfo(response.data.user);
                if(response.data.user.profileSetup){ navigate("/chat");
                }else{ navigate("/profile");
               }
            }
        }
    }

    const handleSignup = async ()=>{
        if(validateSignup()){
            const response = await apiClient.post(SIGNUP_ROUTES, {email, password}, {withCredentials: true});
            if(response.status === 201){
                setUserInfo(response.data.user);
                navigate("/profile");
            }
            console.log({ response });
        }
    }

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
                <div className="flex flex-col gap-10 items-center justify-center">
                    <div className="flex items-center justify-center flex-col">
                        <div className="flex items-center justify-center">
                            <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                            <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
                        </div>
                        <p className="font-medium text-center">Fill in the details to get started with the best chat app</p>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <Tabs className="w-full">
                            <TabsList className="flex justify-between w-full">
                                <TabsTrigger value="login" className="flex-1 text-black text-opacity-90 border-b-2 rounded-none data-[state=active]:border-b-purple-500 data-[state=active]:text-black data-[state=active]:font-semibold p-3 transition-all duration-300 ml-10">Login</TabsTrigger>
                                <TabsTrigger value="signup" className="flex-1 text-black text-opacity-90 border-b-2 rounded-none data-[state=active]:border-b-purple-500 data-[state=active]:text-black data-[state=active]:font-semibold p-3 transition-all duration-300 mr-10">Signup</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login" className="w-full flex flex-col gap-5 mt-4 px-10">
                                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Button className='rounded-full p-6' onClick={handleLogin}>Login</Button>
                            </TabsContent>
                        <TabsContent value="signup" className="w-full flex flex-col gap-5 mt-4 px-4 md:px-10">
                            <Input
                                placeholder="Email"
                                type="email"
                                className="rounded-full p-4 md:p-6 w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                className="rounded-full p-4 md:p-6 w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                placeholder="Confirm Password"
                                type="password"
                                className="rounded-full p-4 md:p-6 w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button className="rounded-full p-4 md:p-6 w-full" onClick={handleSignup}>
                                Signup
                            </Button>
                        </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className='hidden xl:flex justify-center items-center'>
                    <img src={Background} alt="background login" className='h-[700px]' />
                </div>
            </div>
        </div>
    );
}

export default Auth;
