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
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';

const newTransitionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type NewTransitionFormInputs = z.infer<typeof newTransitionFormSchema>;

export const NewTransactionModal = () => {
  const { createTransaction } = useContext(TransactionsContext);
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransitionFormInputs>({
    resolver: zodResolver(newTransitionFormSchema),
    defaultValues: {
      type: 'income',
    },
  });

  async function handleCreateNewTransition({
    description,
    price,
    category,
    type,
  }: NewTransitionFormInputs) {
    createTransaction({
      description,
      price,
      category,
      type,
    });
    reset();
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

            <Controller
              control={control}
              name='type'
              render={({ field }) => (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}>
                  <TransactionTypeButton variant='income' value='income'>
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant='outcome' value='outcome'>
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )}
            />

            <button type='submit' disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
};
