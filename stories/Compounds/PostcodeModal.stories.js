import PostcodeModal from '@/components/Compounds/PostcodeModal.vue'
import { createResponse } from '~/utils/responses'
import { random } from '@/utils/random'

const foundedPostcode = {
  url: '/postcodes/validate',
  method: 'POST',
  status: 200,
  response: createResponse({
    code: 'postcode_found',
    message: 'Il CAP indicato rientra nella zona coperta dal servizio',
    data: true,
  }),
}

const missingPostcode = {
  ...foundedPostcode,
  status: 404,
  response: createResponse({
    success: false,
    statusCode: 404,
    code: 'postcode_not_found',
    message: 'Il CAP indicato non rientra nella zona coperta dal servizio',
    data: random(1, 10000),
  }),
}

const registeredEmail = {
  url: '/postcodes/validate/:id',
  method: 'POST',
  status: 200,
  response: createResponse({
    code: 'postcode_user_subscribed',
    message: 'Email correttamente registrata',
    data: true,
  }),
}

const failedRegisteredEmail = {
  ...registeredEmail,
  status: 500,
  response: createResponse({
    success: false,
    statusCode: 500,
    code: 'postcode_user_subscribe_failed',
    message: 'Registrazione della mail fallita',
    data: false,
  }),
}

export default {
  title: 'Compounds/Postcode Modal',
  component: PostcodeModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    mockData: [foundedPostcode],
  },
}

const Template = (args) => ({
  components: { PostcodeModal },
  setup() {
    return { args }
  },
  template: `
  <div style="height: 100vh">
    <PostcodeModal v-bind="args" />
  </div>
  `,
})

export const WithExistingPostcode = Template.bind({})
WithExistingPostcode.parameters = {}

export const WithoutExistingPostcode = Template.bind({})
WithoutExistingPostcode.parameters = {
  mockData: [missingPostcode, registeredEmail],
}

export const WithoutExistingPostcodeAndFailingEmail = Template.bind({})
WithoutExistingPostcodeAndFailingEmail.parameters = {
  mockData: [missingPostcode, failedRegisteredEmail],
}
