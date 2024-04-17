# virtido_test
In response from provided endpoint myOrder, orders and orderItems has isPaid flag. As I can see this flag means that orders or dishes are already paid, so I included this logic to my implementation.
This logic affects total counting and amount inputs (the one for new orders) behaviour. 
In case with counting total amount of payments, item that has isPaid: true never includes to this amount.
In case with amount input for new orders, input is disabled for cases when order has isPaid: true.
There's two ways to test this input:
1) Change backend response.
2) Comment line 50 in ./src/components/ItemCard.tsx and line 20 in ./src/components/AmountInput.tsx

Way #1 is prefered as in test task description we have no way to change order, but we need it to properly use way #2.

Screenshots:
![Simulator Screenshot - iPhone 15 Pro - 2024-04-17 at 23 21 41](https://github.com/stasmotorny/virtido_test/assets/33233429/c7b6391f-3d51-45d7-8857-8b450fe56a60)
![Simulator Screenshot - iPhone 15 Pro - 2024-04-17 at 23 21 35](https://github.com/stasmotorny/virtido_test/assets/33233429/27b46510-061d-4177-9578-e7e69174f233)
![Simulator Screenshot - iPhone 15 Pro - 2024-04-17 at 23 21 29](https://github.com/stasmotorny/virtido_test/assets/33233429/bb07f744-9216-4dc3-982f-35a9b9ca92bb)
![Simulator Screenshot - iPhone 15 Pro - 2024-04-17 at 23 21 24](https://github.com/stasmotorny/virtido_test/assets/33233429/d94bc324-cff6-4206-8872-aaccb2fd4c7a)
![Simulator Screenshot - iPhone 15 Pro - 2024-04-17 at 23 21 10](https://github.com/stasmotorny/virtido_test/assets/33233429/9b0efccd-76c6-44c4-841b-20cf1183b2e2)
![Simulator Screenshot - iPhone 15 Pro - 2024-04-17 at 23 21 06](https://github.com/stasmotorny/virtido_test/assets/33233429/6eba7d9d-1a9f-4e56-b186-e9ab9bf06cb7)
![Simulator Screenshot - iPhone 15 Pro - 2024-04-17 at 23 20 59](https://github.com/stasmotorny/virtido_test/assets/33233429/043050ab-e92d-4faa-97d9-88fa921b6861)
![Simulator Screenshot - iPhone 15 Pro - 2024-04-17 at 23 20 59](https://github.com/stasmotorny/virtido_test/assets/33233429/65468eea-ec14-4c0a-894c-451964565327)
