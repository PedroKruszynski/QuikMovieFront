import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #CBCBD6;
    transition: color 0.2s;

    &:hover {
      color: #333;
    }
  }

`;

export const MovieInfo = styled.section`
  margin-top: 50px;

  header {
    display: flex;
    align-items: center;
  }

  img {
    border-radius: 2%;
  }

  div {
    margin-left: 24px;

    strong {
      font-size: 36px;
      color: #CBCBD6;
      display: flex;
      justify-content: center;
    }

    p {
      font-size: 22px;
      color: #CBCBD6;
      text-align: center;

      span {
      }
    }

    span {
      color: #EA2153;
    }

  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: #CBCBD6;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #CBCBD6;
      }
    }
  }
`;

export const ProductionInfo = styled.section`
  margin-top: 40px;

  strong {
    font-size: 26px;
    color: #CBCBD6;
  }

  div > strong {
    font-size: 19px;
    color: #4768FA;
  }

`;
