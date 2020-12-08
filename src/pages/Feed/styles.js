import styled from 'styled-components/native';

export const Container = styled.View`
  
`;

export const Post = styled.View`
  margin-top: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 15px;
  align-items: center;
`;

export const Avatar = styled.Image`
height: 32px;
  width: 32px;
  border-radius: 16px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  font-weight: 600;
`;

export const Description = styled.Text`
  padding: 15px;
  line-height: 18px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#999'
})`
  margin: 30px 0;
`;