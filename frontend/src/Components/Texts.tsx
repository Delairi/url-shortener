interface Paragraph {
    text: string,
    where: string,
}
export const ParagraphLink = ({ text, where }: Paragraph) => {

    return (
        <div>
            {where == undefined ?
                <p className="text-[red] font-bold">NO VALID URL</p>
                :
                <a
                    className='cursor-pointer hover:underline'
                    href={where}>{text}</a>
            }
        </div>

    )

} 