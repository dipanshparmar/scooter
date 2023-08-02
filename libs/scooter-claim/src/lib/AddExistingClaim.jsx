import { Modal } from "@factly/scooter-ui";
import SearchClaimsComponent from "./SearchClaims";



export const AddExistingClaim  = ({ editor, setIsVisible , isVisible , setMeta , claimConfig }) => { 
  console.log("existing claim  - config", claimConfig)
  const { claimsFetcher } = claimConfig 
  console.log("existing claim - editor" , editor) 
  console.log("existing claim - editor claimsFetcher " , claimsFetcher)
    return(<Modal
        isOpen={isVisible}
        onClose={() => {
          setIsVisible(()=>{ return false });
        }}
       closeButton={false}
      >
          <div className="scooter-editor-add-existing-claim">
              <div className="scooter-editor-add-existing-claim__content ">
                 <SearchClaimsComponent claimsFetcher={claimsFetcher} editor={editor} setIsVisible={setIsVisible} setMeta={setMeta} itemsPerPage={10}  />
              </div>
          </div>
          </Modal>)
}

export default AddExistingClaim ;