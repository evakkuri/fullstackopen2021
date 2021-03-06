describe('Blog app ', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('before logging in', function () {

    it('login form is shown', function () {
      cy.contains('Cool Blog App')
      cy.contains('Log in')
    })

    it('login form can be opened', function () {
      cy.contains('Log in').click()
    })

    it('login fails with wrong password', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(0, 0, 0)')

      cy.get('html').should('not.contain', 'test logged in')
    })

    it('valid user can login', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    after(function () {
      cy.clearLocalStorage()
      cy.reload()
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test' })
    })

    it('user can log out', function () {
      cy.get('#logout').click()
      cy.contains('Log in')
    })

    it('a new blog entry can be created and gives success notification', function () {
      cy.contains('Add new blog').click()
      cy.get('#input-title').type('Test blog title')
      cy.get('#input-author').type('Test Author')
      cy.get('#input-url').type('testurl')
      cy.get('#submit-blog-form').click()
      cy.get('.notification-wrapper').contains('Test blog title')
      cy.get('[id$=-testblogtitle]').contains('Test blog title')
    })

    it('an invalid blog entry gives error notification', function () {
      cy.contains('Add new blog').click()
      cy.get('#input-title').type('If only title given, give error notification')
      cy.get('#submit-blog-form').click()
      cy.get('.error').contains('Error')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        const blog = {
          title: 'Test blog title',
          author: 'Test Author',
          url: 'testurl'
        }

        cy.createBlog(blog)
      })

      it('likes can be added to a blog', function () {
        cy.contains('Show more').click()
        cy.contains('Likes: 0')
        cy.contains('Like').click().click()
        cy.contains('Likes: 2')
      })

      it('user who created blog can delete it', function () {
        cy.get('[id$=-testblogtitle]')
          .contains('Show more')
          .click()
        cy.contains('Delete blog').click()
        cy.get('[id$=-testblogtitle]').should('not.exist')
      })

      it('user cannot delete a blog added by another user', function () {
        const user = {
          name: 'Another User',
          username: 'test2',
          password: 'test2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.logout()
        cy.login({ username: 'test2', password: 'test2' })

        cy.get('[id$=-testblogtitle]')
          .contains('Show more')
          .click()
        cy.contains('Delete blog').should('not.be.visible')
      })
    })

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first', author: 'first', url: 'first' })
        cy.createBlog({ title: 'second', author: 'second', url: 'second' })
        cy.createBlog({ title: 'third', author: 'third', url: 'third' })
      })

      it('likes can be added to one of those', function () {
        cy.get('[id$=-second]')
          .contains('Show more')
          .click()

        cy.get('[id$=-second]')
          .contains('Like')
          .click()

        cy.get('[id$=-second]')
          .contains('Likes: 1')
      })

      it('blogs are displayed in order of most likes', function () {
        cy.get('[id$=-second]')
          .contains('Show more')
          .click()

        cy.get('[id$=-second]')
          .contains('Like')
          .click()
          .click()

        cy.get('[id$=-third]')
          .contains('Show more')
          .click()

        cy.get('[id$=-third]')
          .contains('Like')
          .click()

        cy.reload()

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('second')
          cy.wrap(blogs[1]).contains('third')
          cy.wrap(blogs[2]).contains('first')
        })
      })
    })
  })

  describe('When on the "Users" page', function () {

    describe('and multiple users with blogs exist', function () {
      beforeEach(function () {
        cy.login({ username: 'test', password: 'test' })
        cy.createBlog({ title: 'first', author: 'first', url: 'first' })
        cy.createBlog({ title: 'second', author: 'second', url: 'second' })

        const user2 = {
          name: 'Test User 2',
          username: 'test2',
          password: 'test2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2)
        cy.login({ username: 'test2', password: 'test2' })
        cy.createBlog({ title: 'first', author: 'first', url: 'first' })

        const user3 = {
          name: 'Test User 3',
          username: 'test3',
          password: 'test3'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user3)
        cy.login({ username: 'test3', password: 'test3' })

        cy.visit('http://localhost:3000/users')
      })

      it('info is shown for all users', function () {
        cy.get('#users-table')
      })
    })
  })
})