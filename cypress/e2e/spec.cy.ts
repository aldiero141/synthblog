describe('template spec', () => {
  it('it should render the page', () => {
    cy.visit('http://192.168.100.35:3000')
    cy.get('[data-testid="cy-header-title"]').should('have.text', 'SynthBlog') 
  })

  it('it should render the welcome page', () => {
    cy.visit('http://192.168.100.35:3000')
    cy.get('[data-testid="cy-welcome-title"]').should('have.text', 'Welcome to SynthBlog') 
  })

  it('it should input user credential', () => {
    cy.visit('http://192.168.100.35:3000')
    cy.get('[data-testid="cy-welcome-name"]').type('Name Test')
    cy.get('[data-testid="cy-welcome-email"]').type('EmailTest@gmail.com')
    cy.get('[type="radio"][data-testid="cy-welcome-gender-male"]').click({ force: true })
    cy.get('[data-testid="cy-welcome-submit"]').click({force: true})
    cy.get('[data-testid="cy-home-title"]').should('exist') 
  })

  it('it should login then logout', () => {
    cy.visit('http://192.168.100.35:3000')
    cy.get('[data-testid="cy-welcome-name"]').type('Name Test')
    cy.get('[data-testid="cy-welcome-email"]').type('EmailTest@gmail.com')
    cy.get('[type="radio"][data-testid="cy-welcome-gender-male"]').click({ force: true })
    cy.get('[data-testid="cy-welcome-submit"]').click({force: true})
    cy.get('[data-testid="cy-header-user"]').trigger('mouseover', {force: true})
    cy.get('[data-testid="cy-header-logout"]').should('be.visible')
    cy.get('[data-testid="cy-header-logout"]').click({force: true})
    cy.get('span').contains('Logout success!').should('exist')
  })

  it('it should create new post', () => {
    cy.visit('http://192.168.100.35:3000')
    cy.get('[data-testid="cy-welcome-name"]').type('Name Test')
    cy.get('[data-testid="cy-welcome-email"]').type('EmailTest@gmail.com')
    cy.get('[type="radio"][data-testid="cy-welcome-gender-male"]').click({ force: true })
    cy.get('[data-testid="cy-welcome-submit"]').click({force: true})
    cy.get('[data-testid="cy-home-create-post"]').click({force: true})
    cy.get('[data-testid="cy-create-update-post-title"]').type('post title test',{force: true})
    cy.get('[data-testid="cy-create-update-post-body"]').type('post body test',{force: true})
    cy.get('[data-testid="cy-create-update-submit"]').click({force: true})
    cy.get('span').contains('success!').should('exist')
  })
})