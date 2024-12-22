import React,{useState} from 'react';
import {Card,CardHeader,CardTitle,CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Alert,AlertDescription,AlertTitle} from "@/components/ui/alert";
import {useAuth} from "../../contexts/AuthContext";

export const LoginForm:React.FC = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {login,isLoading,error} = useAuth();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await login(email,password);
    }

    return (
        <Card className='w-full max-w-md mx-auto'>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <Alert variant='destructive'>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                        className='mb-4'
                    />
                    <Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        className='mb-4'
                    />
                    <Button type='submit' variant='primary' size='lg' className='w-full' disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
};