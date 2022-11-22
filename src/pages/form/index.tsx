import { useCallback, useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { FormInput } from '../composition/input';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
// npm install @hookform/resolvers 进行自定义验证 见 https://react-hook-form.com/get-started#schemavalidation

function Form() {

    const defaultValues = {
        input: "默认值"
    }

    /**
     *  zod验证  
     *  required指的是 input在ts定义上不能为可选而不是不为空
     */
    const zodDataResolver = z.object({
        input: z.string().min(5)
    }).required();


    /**
     * 注册表单控制
     * formState: { errors }，errors：返回验证错误
     * defaultValues 默认值需要后续更新
     *  resolver: zodResolver(zodDataResolver), 执行验证
     *  mode: "onChange" 监听子组件变化获取值
     */

    const { reset,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: zodResolver(zodDataResolver),
        mode: "onChange"
    });

    /**
     * 更新数据
     *  https://react-hook-form.com/api/useform/reset
     */

    // 更新数据的方法
    const resetAsyncForm = useCallback(async () => {
        // 请求后赋值resultData
        const resultData = { input: "更新后的数据" }
        reset(resultData); // asynchronously reset your form values
    }, [reset]);

    // 执行更新数据
    useEffect(() => {
        resetAsyncForm()
    }, [resetAsyncForm])


    const onSubmits = (data: any) => {
        console.log(data);
    }
    const consoleErrors = () => {
        console.log(zodDataResolver);
    }
    return (
        <form onSubmit={handleSubmit(onSubmits)}>
            <FormInput control={control} name='input' errors={errors}></FormInput>
            <div onClick={consoleErrors}>  <button onClick={() => onSubmits}>提交</button></div>
        </form>
    )
}

export default Form
