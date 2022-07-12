type ContactInputType =
    | {
          firstname: string
          lastname: string
          firstname_kana: string
          lastname_kana: string
          email: string
          email_confirm: string
          tel: string
          company: string
          message: string
      }
    | any

export default ContactInputType
