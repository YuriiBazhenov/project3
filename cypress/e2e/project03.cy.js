

import bookTrip from "../../pages/bookTrip"


const bookyourtrip = new bookTrip()

describe('Homework', () => {
  beforeEach(() => {
    cy.visit('https://techglobal-training.com/frontend/project-3')
  })

  it('Test Case 01 - Validate the default Book your trip form', () => {

    cy.get('.radio > input').each((el) => {
      cy.wrap(el).should('be.enabled').and('be.visible')
    })
    cy.get('.radio > input').eq(0).should('be.checked')
    cy.get('.radio > input').eq(1).should('not.be.checked')

    const labels = ['Cabin Class', 'From', 'To', 'Depart', 'Return', 'Number of passengers', 'Passenger 1']

    cy.get('.field > label').each((el, index) => {
      cy.wrap(el).should('have.text', labels[index]).next().should('be.visible')
    })
    const data = ['1', 'Adult (16-64)']

    cy.get('.field:nth-child(7) option:nth-child(1), .field:nth-child(8) option:nth-child(1)')
      .each((el, index) => {
        cy.wrap(el).should('be.visible').and('have.text', data[index])
      })
    bookyourtrip.bookButton().should('be.visible').and('be.enabled')
  })

  it('Test Case 2 - Validate the Book your trip form when Round trip is selected', () => {

    const labels = ['Cabin Class', 'From', 'To', 'Depart', 'Return', 'Number of passengers', 'Passenger 1']

    const validation = ['.ml-0 > .mr-1', ':nth-child(2) > .mr-1']
    cy.get('.radio > input').should('be.visible')
    cy.checkOptionAndValidateOthers('.ml-0 > .mr-1', validation)
    cy.checkOptionAndValidateOthers(':nth-child(2) > .mr-1', validation)


    cy.get('.field > label').each((el, index) => {
      cy.wrap(el).should('have.text', labels[index]).next().children().should('be.visible')
    })

    const data = ['1', 'Adult (16-64)']

    cy.get('.field:nth-child(7) option:nth-child(1), .field:nth-child(8) option:nth-child(1)')
      .each((el, index) => {
        cy.wrap(el).should('be.visible').and('have.text', data[index])
      })

    bookyourtrip.bookButton().should('be.visible').and('be.enabled')
  })

  it('Test Case 3 - Validate the booking for 1 passenger and one way', () => {

    bookyourtrip.oneWayButton().click()

    const testdata = ['Business', 'Illinois', 'Florida', '1', 'Senior (65+)']
    bookyourtrip.selectors().each((el, index) => {
      cy.wrap(el).select(testdata[index])

    })
    bookyourtrip.depart().clear().type(bookyourtrip.getaDate())

    bookyourtrip.bookButton().click()

    const confirmData = ['DEPART', 'IL to FL', 'Number of Passengers: 1', 'Passenger 1: Senior (65+)', 'Cabin class: Business']
    confirmData.forEach(item => {
      cy.contains(item).should('exist')
    })

  })
  it('Test Case 4 - Validate the booking for 1 passenger and round trip', () => {

    bookyourtrip.RoundTripButton().click()
    const testdata = ['First', 'California', 'Illinois', '1', 'Adult (16-64)']
    bookyourtrip.selectors().each((el, index) => {
      cy.wrap(el).select(testdata[index])
    })
    bookyourtrip.depart().clear().type(bookyourtrip.getaDate())
    bookyourtrip.return().clear().type(bookyourtrip.getaDateNextMonth())

    bookyourtrip.bookButton().click()

    const departData = ['DEPART', 'CA to IL', 'Number of Passengers: 1', 'Passenger 1: Adult (16-64)', 'Cabin class: First']
    departData.forEach(item => {
      cy.contains(item).should('exist')
    })
    const returnData = ['RETURN', 'IL to CA']
    returnData.forEach(item => {
      cy.contains(item).should('exist')
    })

  })

  it('Test Case 5 - Validate the booking for 2 passengers and one way', () => {

    bookyourtrip.oneWayButton().click()
    bookyourtrip.selectors().eq(3).select('2')
    const testdata = ['Premium Economy', 'New York', 'Texas', '2', 'Adult (16-64)', 'Child (2-11)']
    bookyourtrip.selectors().each((el, index) => {
      cy.wrap(el).select(testdata[index])
    })
    bookyourtrip.depart().clear().type(bookyourtrip.getaDate())

    bookyourtrip.bookButton().click()

    const confirmData = ['DEPART', 'NY to TX', 'Number of Passengers: 2', 'Passenger 1: Adult (16-64)','Passenger 2: Child (2-11)', 'Cabin class: Premium Economy']
    confirmData.forEach(item => {
      cy.contains(item).should('exist')
    })
  })
})



