"use client";
import { gql, DocumentNode } from "@apollo/client";

export const ACTIVATE_USER: DocumentNode = gql`
  mutation activationUser($activationToken: String!, $activationCode: String!) {
    activationUser(
      activationDto: {
        activationToken: $activationToken
        activationCode: $activationCode
      }
    ) {
      user {
        name
        email
        phone_number
        createdAt
      }
    }
  }
`;
