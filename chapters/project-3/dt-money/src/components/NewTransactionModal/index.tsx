import * as Dialog from '@radix-ui/react-dialog';
import * as z from 'zod';

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransitionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  // type: z.enum(['income', 'outcome']),
});

type NewTransitionFormInputs = z.infer<typeof newTransitionFormSchema>;

export const NewTransactionModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransitionFormInputs>({
    resolver: zodResolver(newTransitionFormSchema),
  });

  async function handleCreateNewTransition(data: NewTransitionFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewTransition)}>
            <input
              type='text'
              placeholder='Descrição'
              required
              {...register('description')}
            />
            <input
              type='number'
              placeholder='Preço'
              required
              {...register('price', { valueAsNumber: true })}
            />
            <input
              type='text'
              placeholder='Categoria'
              required
              {...register('category')}
            />

            <TransactionType>
              <TransactionTypeButton variant='income' value='income'>
                <ArrowCircleUp size={24} />
                Entrada
              </TransactionTypeButton>
              <TransactionTypeButton variant='outcome' value='outcome'>
                <ArrowCircleDown size={24} />
                Saída
              </TransactionTypeButton>
            </TransactionType>

            <button type='submit' disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
};
