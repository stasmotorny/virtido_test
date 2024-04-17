# virtido_test
In response from provided endpoint myOrder, orders and orderItems has isPaid flag. As I can see this flag means that orders or dishes are already paid, so I included this logic to my implementation.
This logic affects total counting and amount inputs (the one for new orders) behaviour. 
In case with counting total amount of payments, item that has isPaid: true never includes to this amount.
In case with amount input for new orders, input is disabled for cases when order has isPaid: true.
There's two ways to test this input:
1) Change backend response.
2) Comment line 50 in ./src/components/ItemCard.tsx and line 20 in ./src/components/AmountInput.tsx

Way #1 is prefered as in test task description we have no way to change order, but we need it to properly use way #2.
