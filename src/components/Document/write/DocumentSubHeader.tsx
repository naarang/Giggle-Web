import { DocumentSubTitleContent } from '@/constants/documents'
import { DocumentType } from '@/types/api/document'

const DocumentSubHeader = ({type}: {type: DocumentType}) => {
  return (
    <div className="w-full relative flex flex-col items-start justify-center pt-[1.875rem] px-8 pb-8 text-left text-[#1e1926]">
    <div className="w-full h-full absolute left-0 bg-[url('/src/assets/images/applyButton.jpeg')] opacity-25" />
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <div className="self-stretch relative title-2">
        {DocumentSubTitleContent[type].name}
      </div>
      <div className="self-stretch flex items-center justify-center body-3 text-[#656565]">
        {DocumentSubTitleContent[type].content}
      </div>
    </div>
  </div>
  )
}

export default DocumentSubHeader