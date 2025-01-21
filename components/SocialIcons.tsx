import { faTelegram, faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Phone } from "lucide-react"

const SocialIcons = () => {
    return (
        <div className="flex">
            <a href="https://t.me/armsacresweed" target="_blank" rel="noopener noreferrer" className="mx-5 text-blue-500 hover:text-blue-700">
                <FontAwesomeIcon icon={faTelegram} height={48} width={48}/>
            </a>
            <a href="https://wa.me/13479354383" target="_blank" rel="noopener noreferrer" className="mx-5 text-green-500 hover:text-green-700">
                <FontAwesomeIcon icon={faWhatsapp} height={48} width={48}/>
            </a>
            <a href="tel:13479354383" target="_blank" rel="noopener noreferrer" className="mx-5 text-gray-500 hover:text-gray-700">
                <Phone height={48} width={48}/>
            </a>
        </div>
    )
}

export default SocialIcons