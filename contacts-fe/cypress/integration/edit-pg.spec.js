const feUrl = 'http://localhost:3000/';
const beUrl = '/contacts';
const testIdx = '1';

describe('연락처 수정 페이지', () => {
    beforeEach(() => {
        cy.loadDetailAndVisit(beUrl, 'GET', testIdx);
        cy.wait('@delay');
    })

    it('1. input value 값으로 기존 정보가 들어온다.', () => {
        cy.visit(`/edit/${testIdx}`);

        cy.fixture('contacts-list').then((contacts) => {
            const contact = contacts.find((e) => e.cIdx === testIdx);
            const { cName, cPhone } = contact;

            cy.get('#input-name').should('have.value', cName);
        })
    })

    it('2. edit 버튼을 누르면 연락처 정보가 수정되고 해당 연락처 상세보기 페이지로 리다이렉트 된다.', () => {
        cy.fixture('contacts-list').then((contacts) => {
            const contact = contacts.find((e) => e.cIdx === testIdx);
            const updateContact = {
                ...contact,
                cName: '수정된 이름',
                cPhone: "01000000000"
            }

            cy.intercept('PUT', `${beUrl}/${testIdx}`, {
                statusCode: 200,
                body: updateContact
            })

            cy.seed(beUrl, 200, updateContact);

            cy.visit(`/edit/${testIdx}`);
            cy.get('#input-name').clear().type(updateContact.cName);
            cy.get('#input-phone').clear().type(updateContact.cPhone);
            cy.contains('Ok!').click();
            cy.url().should('eq', `${feUrl}${testIdx}`);
        })
    })

    it('3. cancel 버튼을 누르면 이전 페이지로 되돌아간다.', () => {
        cy.seedGetList(beUrl, 200, 'contacts-list');

        cy.visit(`/${testIdx}`);
        cy.visit(`/edit/${testIdx}`);
        cy.contains('cancel').click();
        cy.url().should('eq', `${feUrl}${testIdx}`);
    })
})