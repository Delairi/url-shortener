interface Button{
    text: string,
    Click:(e:any)=>void
}
export const Button = ({text,Click}:Button) => {

    return (
        <button 
            onClick={(e)=>Click(e)}
            className='bg-[#212529] text-white pl-4 pr-4 rounded-md'
        >{text}</button>
    )

}