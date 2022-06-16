/* eslint-disable no-undef */
describe('Blog', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user1 = {
            name: 'Testaaja Pro',
            username: 'tester',
            password: 'tester'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user1)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('tester')
            cy.get('#password').type('tester')
            cy.get('#login-button').click()

            cy.contains('Testaaja Pro logged in')
            cy.contains('logout')
            cy.contains('create new blog')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('tester')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error').should('contain', 'wrong username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('.error').should('have.css', 'border-style', 'solid')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('tester')
            cy.get('#password').type('tester')
            cy.get('#login-button').click()
        })

        it('a blog can be created', function() {
            cy.contains('create new blog').click()

            cy.get('#title').type('Tester Blog')
            cy.get('#author').type('Tester Author')
            cy.get('#url').type('www.tester.com')
            cy.get('#create').click()

            cy.contains('Tester Blog')
        })

        it('a blog can be liked', function() {
            cy.contains('create new blog').click()

            cy.get('#title').type('Tester Blog')
            cy.get('#author').type('Tester Author')
            cy.get('#url').type('www.tester.com')
            cy.get('#create').click()

            cy.contains('view').click()
            cy.contains('likes 0')
            cy.get('#like-button').click()
            cy.contains('likes 1')
        })

        it('a blog can be removed by right user', function() {
            cy.contains('create new blog').click()

            cy.get('#title').type('Tester Blog')
            cy.get('#author').type('Tester Author')
            cy.get('#url').type('www.tester.com')
            cy.get('#create').click()

            cy.contains('view').click()

            cy.contains('Tester Blog')

            cy.contains('remove').click()

            cy.contains('Tester Blog').should('not.contain')
        })

        it('blogs are show in the right order by likes', function() {
            for(let i = 0; i < 3; i++){
                cy.contains('create new blog').click()
                cy.get('#title').type(`test ${i}`)
                cy.get('#author').type(`test ${i}`)
                cy.get('#url').type(`test ${i}`)
                cy.get('#create').click()
            }

            cy.contains('test 0 test 0').contains('view').click()
            cy.contains('test 1 test 1').contains('view').click()
            cy.contains('test 2 test 2').contains('view').click()

            cy.contains('like').click()
            cy.contains('hide').click()
            cy.contains('like').click()
            cy.contains('like').click()
            cy.contains('like').click()

            cy.get('.blog').eq(0).should('contain', 'test 1 test 1')
			cy.get('.blog').eq(2).should('contain', 'test 2 test 2')
        })
    })

  })