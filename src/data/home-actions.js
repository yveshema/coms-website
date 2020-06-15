import certificationIcon from "../images/icons/certification-icon-70px.svg";
import investIcon from "../images/icons/invest-icon-70px.svg";
import learnIcon from "../images/icons/learn-icon-70px.svg";

export default {
    certification: {
        icon: certificationIcon,
        text:[
            "COMS is on a mission to improve moringa leaf farming and processing in order to meet sanitary and nutritional standards.",
            "Apply for your certification today."
        ],
        action: "Get certified organic",
        path: "certification"

    },
    invest: {
        icon: learnIcon,
        text: [
            "Moringa Oleifera is an exceptional resource for developing countries.",
            "This “Superfood” is a nutritionally rich vegetable available in nations with tropical and subtropical climate."
        ],
        path: "about",
        action: "Learn more"
    },
    learn: {
        icon: investIcon,
        text: [
            "Moringa leaves were ranked top vegetable by the World Vegetable Center (AVRDC).",
            "The moringa leaf is a new promising source of income, sustainable             agriculture and business growth."
        ],
        path: "cultivation",
        action: "Invest in moringa"
    }
}