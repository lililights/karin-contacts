const feUrl = 'http://localhost:3000/';
const beUrl = '/contacts';

describe('연락처 등록 페이지', () => {
    beforeEach(() => {
        cy.visit('/add');
    })

    context('1. input 테스트', () => {

        it('1-1. 페이지에 들어오면 NAME 입력칸에 포커스가 된다.', () => {
            cy.focused().should('have.id', 'input-name');
        })

        it('1-2. 입력시 value값이 바뀐다.', () => {
            const typeName = 'AAA';
            const tyepPhone = '010-1234-1234';

            cy.get('#input-name').type(typeName).should('have.value', typeName);
            cy.get('#input-phone').type(tyepPhone).should('have.value', tyepPhone);
        })
    })

    context('2. submit 테스트', () => {

        it('2-1. 새로운 연락처를 등록하면 해당 연락처 상세보기 페이지로 리다이렉트 한다.', () => {
            const newContact = {
                cIdx: "1",
                cName: "AAA",
                cPhone: "01012341234"
            }

            cy.seedPost(beUrl, 200, newContact);
            cy.seed(`${beUrl}/${newContact.cIdx}`, 200, newContact);

            cy.get('#input-name').type(newContact.cName);
            cy.get('#input-phone').type(newContact.cPhone);
            cy.contains('Ok!').click();
            cy.url().should('eq', `${feUrl}${newContact.cIdx}`);
        })
    })

    context('3. 등록 취소', () => {

        it('3-1. cancel 버튼을 누르면 이전 페이지로 되돌아간다.', () => {
            cy.seedGetList(beUrl, 200, 'contacts-list');

            cy.visit('/');
            cy.visit('/add');
            cy.contains('cancel').click();
            cy.url().should('eq', feUrl);
        })
    })
})