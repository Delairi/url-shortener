interface Input{
    placeholder?: string,
    Change:(e:any)=>void
}

export const Input = ({ placeholder,Change }:Input) => {

    return (
        <input
                onChange={(e)=>Change(e)}
                placeholder={placeholder}
                className='shadow-md rounded-md p-2'
        />
    )

}