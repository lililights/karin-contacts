const feUrl = 'http://localhost:3000/';
const beUrl = '/contacts';
const testIdx = '1';

describe('연락처 상세보기 페이지', () => {
    context('1. 네트워크 오류 또는 경로에 대한 연락처 정보가 없는 경우', () => {
        beforeEach(() => {
            cy.loadDetailAndVisit(beUrl, 'GET', 'does-not-exist');
            cy.wait('@delay');
            cy.seedGetList(beUrl, 200, 'contacts-list');
        })

        it('1-1. 에러 메세지를 보여준다', () => {
            cy.get('.detail-pg').should('contain', 'ERROR');
        })

        it('1-2. [list] 버튼을 누르면 리스트 페이지로 이동한다.', () => {
            cy.contains('list').click();
            cy.url().should('eq', feUrl);
        })
    })

    context('2. 경로에 대한 연락처 정보를 성공적으로 가져온 경우', () => {
        beforeEach(() => {
            cy.loadDetailAndVisit(beUrl, 'GET', testIdx);
            cy.wait('@delay');
            cy.seedGetList(beUrl, 200, 'contacts-list');
        })

        it('2-1. 연락처 상세정보를 보여준다.', () => {
            cy.get('.detail-table').should('exist');
        })

        it('2-2. 수정 버튼을 누르면 수정 페이지로 이동한다.', () => {
            cy.contains('edit').click();
            cy.url().should('include', `${feUrl}edit/${testIdx}`);
        })

        it('2-3. 삭제 버튼을 누르면 연락처가 삭제되고 리스트 페이지로 이동한다.', () => {
            cy.fixture('contacts-list').then((contacts) => {
                const filteredContacts = contacts.filter((e) => e.cIdx !== testIdx);

                cy.intercept('DELETE', `${beUrl}/${testIdx}`, {
                    statusCode: 200
                });

                cy.seed(beUrl, 200, filteredContacts);

                cy.contains('delete').click();
                cy.url().should('eq', feUrl);

                filteredContacts.forEach((contact) => {
                    cy.contains(contact.cName).should('be.visible');
                })
            })
        })

        it('2-4. 목록 버튼을 누르면 목록 페이지로 이동한다.', () => {
            cy.contains('list').click();
            cy.url().should('eq', feUrl);
        })
    })
})