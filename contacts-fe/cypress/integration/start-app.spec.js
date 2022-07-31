const beUrl = '/contacts';

describe('메인(연락처 리스트) 페이지', () => {
    context('1. 네트워크 연결에 성공해 데이터를 가져왔을 경우', () => {

        it('1-1. 저장된 연락처가 있을 경우, 연락처 리스트를 보여준다.', () => {
            cy.loadListAndVisit(beUrl, 200, 'contacts-list');
            cy.wait('@delay');
            cy.get('.list-row').should('have.length', 9);
        })

        it('1-2. 저장된 연락처가 없을 경우, 연락처가 없다는 메세지를 보여준다.', () => {
            cy.loadListAndVisit(beUrl, 200, '');
            cy.wait('@delay');
            cy.get('.list').should('have.text', '등록된 연락처가 없습니다.');
        })
    })

    context('2. 네트워크에 연결에 실패했을 경우', () => {

        it('2-1. 에러 메세지를 보여준다.', () => {
            cy.loadListAndVisit(beUrl, 500, '');
            cy.wait('@delay');
            cy.get('.error').should('exist');
        })
    })
})