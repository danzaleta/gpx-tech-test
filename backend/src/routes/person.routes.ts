import { Router } from 'express';
import { getPeople, createPerson, updatePerson, deletePerson } from '../controllers/person.controller';

const router = Router();

router.get('/persons', getPeople);
router.post('/persons', createPerson);
router.put('/persons/:id', updatePerson);
router.delete('/persons/:id', deletePerson);

export default router;