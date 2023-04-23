import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay } from './styles';
import { X } from 'phosphor-react';

export const NewTransactionModal = () => {
  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form>
            <input type='text' placeholder='Descrição' required />
            <input type='number' placeholder='Preço' required />
            <input type='text' placeholder='Categoria' required />

            <button type='submit'>Cadastrar</button>
          </form>

          <Dialog.Close />
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
};
