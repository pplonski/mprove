import * as constants from '../../../src/app/constants/_index';
import * as api from '../../../src/app/api/_index';
import * as enums from '../../../src/app/enums/_index';

const userId = '13-12-user@example.com';
const password = '123123';

const projectId = 'project_13_12';

describe('13-12 model-filters-string-type-is-blank (logged in)', () => {
  it(`should be able to filter string-type-is-blank`, () => {
    cy.deletePack({
      user_ids: [userId],
      project_ids: [projectId]
    });
    cy.seedPack({
      users: [
        {
          user_id: userId,
          password: password,
          email_verified: true
        }
      ],
      members: [
        {
          project_id: projectId,
          member_id: userId,
          is_admin: true,
          is_editor: true
        }
      ],
      projects: [
        {
          project_id: projectId,
          has_credentials: true
        }
      ]
    });
    cy.loginUser({ user_id: userId, password: password });
    cy.basicVisit(
      `${constants.PATH_PROJECT}/${projectId}/${constants.PATH_MODE}/${
        enums.LayoutModeEnum.Prod
      }/model/m1`
    );
    cy.loading();

    cy.get('[data-cy=modelTreeItemFilterButton]')
      .eq(1)
      .click({ force: true });
    cy.loading();

    cy.get('[data-cy=fractionStringType]').click();
    cy.get('[data-cy=fractionStringTypeIsNotBlank]').click();
    cy.get('[data-cy=modelTitle]').click();
    cy.loading();

    cy.get('[data-cy=addModelFilterFraction]').click({ force: true });
    cy.loading();

    cy.get('[data-cy=fractionStringType]').should($elements => {
      expect($elements).to.have.length(2);
    });
  });
});
