

class bookTrip {

    oneWayButton(){
        return cy.get('.radio > input').eq(0)
    }

    RoundTripButton(){
        return cy.get('.radio > input').eq(1)
    }


    bookButton(){
        return cy.get('.Button_c_button__TmkRS')
    }

    selectors(){
        return cy.get('.field .select').children()
    }

    depart(){
        return cy.get(':nth-child(5) > .control > .react-datepicker-wrapper > .react-datepicker__input-container > input')
    }
    
    return(){
        return cy.get(':nth-child(6) > .control > .react-datepicker-wrapper > .react-datepicker__input-container > input')
    }

    getaDate(){
        const date = new Date()
        let currentDay = String(date.getDate() + 7)
        let currentMonth = String(date.getMonth() + 1)
        let currentYear = date.getFullYear()
        return (`${currentMonth}/${currentDay}/${currentYear}`)
    }
    getaDateNextMonth(){
        const date = new Date()
        let currentDay = String(date.getDate() + 7)
        let currentMonth = String(date.getMonth() + 2)
        let currentYear = date.getFullYear()
        return (`${currentMonth}/${currentDay}/${currentYear}`)
    }


}


export default bookTrip