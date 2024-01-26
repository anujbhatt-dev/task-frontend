import "./Modal.css"

const Modal = (props) =>{
        return <div className="modal-wrapper">
                <div onClick={props.toggle} className="modal-backdrop">
                    Backdrop
                </div>
                <div className="modal">
                    {props.children}
                    <span onClick={props.toggle}>X</span>
                </div>
            </div>
}

export default Modal